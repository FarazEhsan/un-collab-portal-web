import {formatDistanceToNow, parseISO} from 'date-fns';
import React from "react";

interface TimeAgoProps {
    timestamp: string
}

const TimeAgo = ({timestamp}: TimeAgoProps) => {
    let timeAgo = '';
    if (timestamp) {
        const date = parseISO(timestamp);
        const timePeriod = formatDistanceToNow(date);
        timeAgo = `${timePeriod} ago`;
    }

    return (

        <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo}</p>

    );
};
export default TimeAgo;
