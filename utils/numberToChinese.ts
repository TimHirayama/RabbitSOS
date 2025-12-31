export function numberToChinese(n: number): string {
    if (n === 0) return "零元整";
    
    // Constants
    const unit = "仟佰拾億仟佰拾萬仟佰拾元";
    const str = unit.substring(unit.length - n.toString().length);
    const digits = "零壹貳參肆伍陸柒捌玖";
    
    // Simple naive mapping won't work for zeros.
    // Use the robust parsing method.
    
    const fraction = ['角', '分'];
    const digit = ['零', '壹', '貳', '參', '肆', '伍', '陸', '柒', '捌', '玖'];
    const units = [['元', '萬', '億'], ['', '拾', '佰', '仟']];
    
    let num = Math.abs(n);
    let s = '';

    for (let i = 0; i < units[0].length && num > 0; i++) {
        let p = '';
        for (let j = 0; j < units[1].length && num > 0; j++) {
            p = digit[num % 10] + units[1][j] + p;
            num = Math.floor(num / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + units[0][i] + s;
    }

    return s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整') + '整';
}
