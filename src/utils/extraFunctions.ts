import React from "react";

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
