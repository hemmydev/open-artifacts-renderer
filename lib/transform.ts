import * as Babel from "@babel/standalone";
import * as t from "@babel/types";
import { NodePath } from "@babel/core";
import * as React from "react";
import * as recharts from "recharts";
import * as uiComponents from "@/components/ui";
import * as lucide from "lucide-react";
import type { TransformResult } from "./types";

/**
 * Transforms user code into a React component
 */
export function transformToComponent(code: string): React.ComponentType {
  const { modifiedCode, componentName } = removeDefaultExport(code);

  const transpiled = Babel.transform(modifiedCode, {
    presets: ["react"],
    plugins: [createImportTransformerPlugin()],
  }).code;

  if (!transpiled || !componentName) {
    throw new Error("Failed to transform code");
  }

  const factoryCode = createFactoryFunction(transpiled, componentName);
  const factory = new Function(factoryCode)();

  return factory(React, recharts, uiComponents, lucide);
}

/**
 * Creates a factory function that returns the component
 */
function createFactoryFunction(code: string, componentName: string): string {
  return `
    return function(React, recharts, uiComponents, lucide) {
      ${code}
      return ${componentName};
    }
  `;
}

/**
 * Removes default export from code and returns the component name
 */
function removeDefaultExport(input: string): TransformResult {
  // Match: export default function ComponentName() { ... }
  const exportWithDeclaration =
    /export\s+default\s+function\s+([A-Za-z0-9_]+)\s*\([^)]*\)\s*{[^}]*}/;

  // Match: export default ComponentName;
  const exportStatement = /export\s+default\s+([A-Za-z0-9_]+);?/;

  let match = input.match(exportWithDeclaration);

  if (match) {
    return {
      modifiedCode: input.replace(/export\s+default\s+function/, "function"),
      componentName: match[1],
    };
  }

  match = input.match(exportStatement);

  if (match) {
    return {
      modifiedCode: input.replace(exportStatement, ""),
      componentName: match[1],
    };
  }

  return {
    modifiedCode: input,
    componentName: null,
  };
}

/**
 * Babel plugin to transform ES6 imports to object destructuring
 */
function createImportTransformerPlugin() {
  return {
    name: "import-transformer",
    visitor: {
      ImportDeclaration(path: NodePath<t.ImportDeclaration>) {
        const source = path.node.source.value;
        const specifiers = path.node.specifiers;

        if (specifiers.length === 0) return;

        const objectName = getObjectNameForSource(source);
        const properties = extractImportProperties(specifiers);

        if (properties.length === 0) return;

        const declaration = t.variableDeclaration("const", [
          t.variableDeclarator(t.objectPattern(properties), t.identifier(objectName)),
        ]);

        path.replaceWith(declaration);
      },
    },
  };
}

/**
 * Maps import sources to runtime object names
 */
function getObjectNameForSource(source: string): string {
  if (source === "react") return "React";
  if (source.startsWith("@/components/ui")) return "uiComponents";
  if (source === "lucide-react") return "lucide";
  return source;
}

/**
 * Extracts properties from import specifiers
 */
function extractImportProperties(
  specifiers: t.ImportDeclaration["specifiers"]
): t.ObjectProperty[] {
  return specifiers
    .filter((spec): spec is t.ImportSpecifier => t.isImportSpecifier(spec))
    .map((spec) => {
      const imported = spec.imported;
      const importedName = t.isIdentifier(imported)
        ? imported.name
        : t.isStringLiteral(imported)
        ? imported.value
        : null;

      if (!importedName) return null;

      const isShorthand = importedName === spec.local.name;

      return t.objectProperty(
        t.identifier(importedName),
        t.identifier(spec.local.name),
        false,
        isShorthand
      );
    })
    .filter((prop): prop is t.ObjectProperty => prop !== null);
}
