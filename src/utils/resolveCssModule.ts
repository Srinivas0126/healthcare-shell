type CssModuleMap = Record<string, string>;

type CssModuleCandidate =
  | CssModuleMap
  | {
      default?: unknown;
      locals?: unknown;
    }
  | null
  | undefined;

const EMPTY_CSS_MODULE: CssModuleMap = {};

export const resolveCssModule = (moduleValue: CssModuleCandidate): CssModuleMap => {
  if (!moduleValue || typeof moduleValue !== "object") {
    return EMPTY_CSS_MODULE;
  }

  const moduleWithDefault = moduleValue as { default?: unknown };
  const resolvedValue = moduleWithDefault.default ?? moduleValue;

  if (!resolvedValue || typeof resolvedValue !== "object") {
    return EMPTY_CSS_MODULE;
  }

  const moduleWithLocals = resolvedValue as { locals?: unknown };

  if (moduleWithLocals.locals && typeof moduleWithLocals.locals === "object") {
    return moduleWithLocals.locals as CssModuleMap;
  }

  return resolvedValue as CssModuleMap;
};
