

export const random = (len: number) => {
    const randomString = "adfhkjahkj128973987234sd";
    let length = randomString.length;

    let ans = "";

    for(let i = 0; i < len ; i++) {
        ans += randomString[Math.floor((Math.random() * length))]
    }

    return ans;
}