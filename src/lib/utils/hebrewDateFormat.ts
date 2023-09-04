const hebrewDateFormat = (
    date: string,
): string => {
    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jerusalem', 
        year: 'numeric',      
        month: 'long',            
        day: 'numeric',            
    };
    const inputDate = new Date(date);
    return inputDate.toLocaleString('he-IL', options);
};
export default hebrewDateFormat;
