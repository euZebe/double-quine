export interface CellProps {
    value: number;
    timesPicked?: number;
    toggleNumber: (value: number) => void;
    on: boolean;
}
