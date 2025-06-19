import { IRegisterActions, IRegisterCredentialEmailPass, IRegisterValidations } from "../domain/actions/IRegisterActions"
import { IRegisterGateway } from "../infrastructure/gateways/IRegisterGateway"
import { registerGateway } from "../infrastructure/gateways/RegisterGateway"

export const registerActions = (): IRegisterActions => {

	const gateway: IRegisterGateway = registerGateway()

    return {
        registerEmailPass: async (credentials: IRegisterCredentialEmailPass) => {
            try {
                const result = await gateway?.registerEmailPass(credentials)
                return {
					code: result.code,
					type: result?.type,
					message: JSON.parse(result.response)?.message
				}
            } catch (e) {
                return e
            }

        },
		 registerProvider: async () => null
    }
}