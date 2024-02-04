export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export enum ReactionType {
    Up = "UPVOTE",
    Down = "DOWNVOTE",
}
export const getNameString = (name:string) => {
    return name?.replace(' ', '+')
}
