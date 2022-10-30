import { Contract, providers, utils, BigNumber } from 'ethers';
import { EXCHANGE_CONTRACT_ABI, EXCHANGE_CONTRACT_ADDRESS, TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDRESS } from '../constants';

export const removeLiqudity = async (signer, removeLPTokensWei) => {
    const exchangeContract = new Contract(EXCHANGE_CONTRACT_ADDRESS, EXCHANGE_CONTRACT_ABI, signer);
    const tx = await exchangeContract.removeLiqudity(removeLPTokensWei);
    await tx.wait();
}

export const getTokensAfterRemove = async (provider, removeLPTokensWei, _ethBalance, cryptoDevTokenReserve) => {
    try {
        const exchangeContract = new Contract(EXCHANGE_CONTRACT_ADDRESS, EXCHANGE_CONTRACT_ABI, provider);

        const _totalSupply = await exchangeContract.totalSupply();
        const _removeEther = _ethBalance.mul(removeLPTokensWei).div(_totalSupply);
        const _removeCD = cryptoDevTokenReserve.mul(removeLPTokensWei).div(_totalSupply);

        return {
            _removeEther,
            _removeCD,
        }
    }
    catch (error) {
        console.error(error);
    }
}