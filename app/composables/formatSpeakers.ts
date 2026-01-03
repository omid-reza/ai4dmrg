export const formatSpeakers = (speakers: string[]) => {
    const label = speakers.length > 1 ? 'Speakers' : 'Speaker';
    return `${label}: ${speakers.join(', ')}`;
}