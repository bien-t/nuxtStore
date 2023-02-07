
const formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

function formatMoney(cents: number) {
    return formatter.format(cents / 100);
}

export default formatMoney;