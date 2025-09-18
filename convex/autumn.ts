import { components } from "./_generated/api";
import { Autumn } from "@useautumn/convex";

export const autumn = new Autumn(components.autumn, {
	secretKey: process.env.AUTUMN_SECRET_KEY ?? "",
	identify: async (ctx: any) => {  // eslint-disable-line @typescript-eslint/no-explicit-any
		const user = await ctx.auth.getUserIdentity();
		if (!user) return null

		return {
			customerId: user.subject as string,
			customerData: {
				name: user.name as string,
				email: user.email as string,
			},
		};
	},
});

/**
 * These exports are required for our react hooks and components
 */

export const {
  track,
  cancel,
  query,
  attach,
  check,
  checkout,
  usage,
  setupPayment,
  createCustomer,
  listProducts,
  billingPortal,
  createReferralCode,
  redeemReferralCode,
  createEntity,
  getEntity,
} = autumn.api();