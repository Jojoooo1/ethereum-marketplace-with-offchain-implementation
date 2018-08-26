import { Connect, SimpleSigner } from "uport-connect";

export const uport = new Connect("consensys_app", {
  clientId: "2oydvarYnFs4SXCCooPifAMmwKLra6GpmZn",
  network: "rinkeby",
  signer: SimpleSigner("ca9a62595176a3601470030d406ca0e3358d2561e3d09d4a764f9a841cbc037a")
});
