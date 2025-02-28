export const cutSentence = (sentece: string, limit: number) => {
    if(sentece.length > limit) {
        let cut = sentece.slice(0, limit-3) + '...';
        return cut;
    }
    return sentece;
}