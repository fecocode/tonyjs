import {
  IVueComponentCollection,
  VueComponentCollection,
  VueComponentMap,
} from "../types/files-management/components";
import { autoImportComponents } from "../utils/autoimport";

class LayoutsCollection extends VueComponentCollection {
  constructor(
    components: VueComponentMap,
    private requiredLayoutsComponents: string[]
  ) {
    super(components, requiredLayoutsComponents);
  }
}

export function makeLayoutCollection(): IVueComponentCollection {
  const DEFAULT_LAYOUT_COMPONENTS_NAMES = ["default", "empty"];
  const defaultLayoutsFiles = import.meta.globEager(
    "../layouts/default-layouts/*.vue"
  );

  const defaultLayouts = autoImportComponents(defaultLayoutsFiles);

  return new LayoutsCollection(defaultLayouts, DEFAULT_LAYOUT_COMPONENTS_NAMES);
}
