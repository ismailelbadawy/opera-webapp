export class Hall {
    public get hallId(): string {
        return this._hallId;
    }
    public set hallId(value: string) {
        this._hallId = value;
    }
    
    public get hallName(): string | null {
        return this._hallName;
    }
    
    public set hallName(value: string | null) {
        this._hallName = value;
    }
    
    public get hallShape(): number | null {
        return this._hallShape;
    }
    public set hallShape(value: number | null) {
        this._hallShape = value;
    }

    constructor(
        private _hallId: string,
        private _hallName: string | null,
        /** Represents the dimensions of the hall 10x10 */
        private _hallShape: number | null
    ) {

    }
}
