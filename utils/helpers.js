module.exports = {
    format_date: (date) => {
        // Format date as MM/DD/YYYY
        const options = { month: 'numeric', day: '2-digit', year: '2-digit' };
        return new Date(date).toLocaleDateString(undefined, options);
    },
};
