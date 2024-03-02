"use client"
import * as React from "react";
import {NextIntlClientProvider, useMessages} from "next-intl";

export function LangProvider({children, ...props}: any) {
    const messages = useMessages()
    return <NextIntlClientProvider {...props} messages={messages}>{children}</NextIntlClientProvider>;
}
