export class CoinNode {
    public coin: number;
    public coinSum: number;
    public isMaxPlayer: boolean;
    public playerScore: number;
    public depth: number;
    public children: CoinNode[];
    public parent: CoinNode;

    constructor(parent: CoinNode, coin: number, isMaxPlayer: boolean, depth: number) {
        this.parent = parent;
        this.coin = coin;
        this.coinSum = parent == null ? coin : parent.coinSum + coin;
        this.isMaxPlayer = isMaxPlayer;
        this.depth = depth;
        this.children = [];

        if (this.coinSum == 10) {
            this.playerScore = isMaxPlayer ? 10 - depth : depth - 10;
        } else {
            this.playerScore = 0;
        }
    }
}
