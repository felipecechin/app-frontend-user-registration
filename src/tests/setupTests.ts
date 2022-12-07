import '@testing-library/jest-dom/extend-expect'

jest.mock('next/dynamic', () => ({
    __esModule: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: (...props: any[]) => {
        const dynamicModule = jest.requireActual('next/dynamic')
        const dynamicActualComp = dynamicModule.default
        const requiredComponent = dynamicActualComp(props[0])
        requiredComponent.preload ? requiredComponent.preload() : requiredComponent.render.preload()
        return requiredComponent
    },
}))

class IntersectionObserver {
    observe = jest.fn()
    disconnect = jest.fn()
    unobserve = jest.fn()
}

Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserver,
})

Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserver,
})
