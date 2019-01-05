/**
 * AMD implementation for local modules defined in a single file only.
 * Needs to be the first thing included by TypeScript in the outFile.
 * Circular references between the top level of two modules will either produce
 * a type error or will silently fail.  Don't do that.
 */

interface Window {
  require: (id: string) => any;
  define: (id: string, dependencies: string[], factory: Function) => any;
}

(function() {
  const registry: {
    [id: string]: {
      dependencyIds: string[];
      factory: Function;
    };
  } = {};

  const instances: { [id: string]: object } = {};

  window.require = instances.require = function require(id: string): object {
    if (instances[id]) {
      return instances[id];
    }

    if (!registry[id]) {
      return {};
    }

    instances[id] = {};

    const dependencies = registry[id].dependencyIds.map(function(dependencyId) {
      if (dependencyId === "exports") {
        return instances[id];
      }

      return instances[dependencyId] || require(dependencyId);
    });

    registry[id].factory.apply(null, dependencies);

    return instances[id];
  };

  window.define = function(
    id: string,
    dependencyIds: string[],
    factory: Function
  ): void {
    registry[id] = { dependencyIds, factory };
  };
})();
