export default class Utils {
    public static createRandomNumber(min: number, max: number): number {
        let differ: number = max - min;
        return Math.round(min + differ * Math.random());
    }
}