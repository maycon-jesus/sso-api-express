type contextNames = 'global' | 'controller' | 'route' | 'middleware'

const dependencys:{
    [contextName: string]: {
        [dependencyName: string]: any
    }
} = {}

export function setDependency (contextName:contextNames|contextNames[], dependencyName:string, value:any) {
    if (Array.isArray(contextName)) {
        contextName.forEach(name => {
            if (!dependencys[name]) dependencys[name] = {}
            dependencys[name][dependencyName] = value
        })
    } else {
        if (!dependencys[contextName]) dependencys[contextName] = {}
        dependencys[contextName][dependencyName] = value
    }
}

export function getDependencysOfContext (contextName:contextNames):any {
    if (!dependencys[contextName]) dependencys[contextName] = {}
    const dependency = dependencys[contextName]
    Object.setPrototypeOf(dependency, dependencys.global)
    return dependency
}
