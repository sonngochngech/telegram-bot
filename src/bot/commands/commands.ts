interface Commands {
    command: string;
    description: string;
}

export const COMMANDS: Commands[] = [
    { command: 'start', description: 'add channel to channel list' },
    { command: 'help', description: 'Show help text' },
    { command: 'remove_channel',description:"remove a channel from the channel list"},
    { command: 'mychannels', description: 'get channel list' },
    { command: 'compare_report', description: 'Compare two reports from a specific channel' },
    { command: 'get_report', description: 'get a report in a specific day' },
    { command: 'cancel', description: 'Cancel converstaion' },
];
