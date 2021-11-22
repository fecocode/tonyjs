import { VueComponentMap } from "../types/files-management/components";

export function autoImportComponents(
  files: Record<string, { [key: string]: any }>
): VueComponentMap {
  const components: VueComponentMap = {};

  for (const key in files) {
    const component = key.split("/");
    const [name] = component[component.length - 1].split(".");

    components[name] = files[key].default;
  }

  return components;
}
