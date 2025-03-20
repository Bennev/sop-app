export enum EExpenseType {
  BUILDING_CONSTRUCTION = 'BUILDING_CONSTRUCTION',
  ROAD_CONSTRUCTION = 'ROAD_CONSTRUCTION',
  OTHERS = 'OTHERS',
}

export type TExpense = {
  id: number;
  type: EExpenseType;
  protocol_date: Date;
  due_date: Date;
  creditor: string;
  description: string;
  value: string;
}