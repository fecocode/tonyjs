import { Component } from "vue";

export interface VueComponentMap {
  [key: string]: Component;
}

export interface IVueComponentCollection {
  getComponent(componentName: string): Component;
  getAllComponents(): VueComponentMap;
}

export class VueComponentCollection implements IVueComponentCollection {
  private _components: VueComponentMap;

  constructor(components: VueComponentMap, requiredComponents: string[]) {
    if (!this._isCollectionComplete(components, requiredComponents)) {
      throw new Error(
        "VueComponentCollection.constructor: Collection is not complete!"
      );
    }

    this._components = components;
  }

  _isCollectionComplete(
    components: VueComponentMap,
    requiredComponents: string[]
  ): boolean {
    for (const componentName of requiredComponents) {
      if (!components[componentName]) {
        return false;
      }
    }

    return true;
  }

  getComponent(componentName: string): Component {
    return this._components[componentName];
  }

  getAllComponents(): VueComponentMap {
    return this._components;
  }
}
