import {formatDistanceToNow, parseISO} from 'date-fns';
import React from "react";
import {useTranslations} from "next-intl";

interface TimeAgoProps {
    timestamp: string
}

const TimeAgo = ({timestamp}: TimeAgoProps) => {
    const t = useTranslations('PostCard');
    let timeAgo = '';
    if (timestamp) {
        const date = parseISO(timestamp);
        const timePeriod = formatDistanceToNow(date);
        timeAgo = `${timePeriod} ${t('fields.timeAgo')}`;
    }

    return (

        <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo}</p>

    );
};
export default TimeAgo;
