import { CoinNode } from "./CoinNode";
import { CoinTree } from "./CoinTree";

export class Minimax {
    public tree: CoinTree;

    constructor(startFirst: boolean) {
        const rootNode = new CoinNode(null, 0, !startFirst, 0);
        this.tree = {
            root: rootNode,
            selectingNode: rootNode,
        };

        this.generateTree(this.tree.root, 0);
        this.tree.selectingNode = this.tree.root;
    }

    public selectNode(coin: number): void {
        const selected = this.tree.selectingNode.children.find((value) => value.coin === coin);
        this.tree.selectingNode = selected;
    }

    public getPossibleWin(): number[][] {
        return this.getPossibleWinInternal(this.tree.selectingNode.children);
    }

    private getPossibleWinInternal(currentNode: CoinNode[]): number[][] {
        let lists: number[][] = [];

        for (const node of currentNode) {
            if (node.playerScore > 0) {
                const list = [];
                let selectingNode: CoinNode = node;
                while (selectingNode != this.tree.selectingNode) {
                    list.unshift(selectingNode.coin);
                    selectingNode = selectingNode.parent;
                }
                lists.push(list);
            } else {
                lists = lists.concat(this.getPossibleWinInternal(node.children));
            }
        }
        
        return lists;
    }

    private generateTree(parentNode: CoinNode, depth: number): void {
        const listOfPossibleHeaps: number[] = this.getPossibleStates(parentNode.coinSum);

        const isChildMaxPlayer: boolean = !parentNode.isMaxPlayer;
        listOfPossibleHeaps.forEach((n) => {
            const newNode: CoinNode = new CoinNode(parentNode, n, isChildMaxPlayer, depth + 1);
            parentNode.children.push(newNode);

            if (newNode.coinSum < 10) {
                this.generateTree(newNode, depth + 1);
            }
        });

    }

    public getPossibleStates(currentCount: number): number[] {
        const possibleNumber: number[] = [];

        if (currentCount + 1 <= 10) {
            possibleNumber.push(1);
        }

        if (currentCount + 2 <= 10) {
            possibleNumber.push(2);
        }

        if (currentCount + 5 <= 10) {
            possibleNumber.push(5);
        }

        return possibleNumber;
    }
}
