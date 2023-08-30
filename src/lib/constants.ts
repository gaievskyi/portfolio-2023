export const IS_DEVELOPMENT = process.env.NODE_ENV === "development"
export const IS_TEST = process.env.NODE_ENV === "test"
export const IS_PRODUCTION = process.env.NODE_ENV === "production"

export const ROOT_ELEMENT = "__next" as const
