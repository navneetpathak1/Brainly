"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = void 0;
const random = (len) => {
    const randomString = "adfhkjahkj128973987234sd";
    let length = randomString.length;
    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += randomString[Math.floor((Math.random() * length))];
    }
    return ans;
};
exports.random = random;
