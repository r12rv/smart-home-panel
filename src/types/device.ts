export type LocalDevice = {
  id: number;
} & CreatedDevice;

export type CreatedDevice = {
  name: string;
  room: string,
  status: boolean;
  value?: number | string;
}
