import {MintYourPassportOverlay} from "../components/overlays/MintYourPassportOverlay";
import {LoadingOverlay} from "../components/overlays/LoadingOverlay";
import {MintCompletedOverlay} from "../components/overlays/MintCompletedOverlay";

export const mintingOverlayStages = {
    hidden: {name: 'hidden', component: null},
    confirmMint: {name: 'confirmMint', component: MintYourPassportOverlay},
    loading: {name: 'loading', component: LoadingOverlay},
    mintCompleted: {name: 'mintCompleted', component: MintCompletedOverlay},
}

export const loadingMessages = {
    generatingScore: 'Score calculation in progress...',
    waitingTxResult: 'Waiting for transaction confirmation...',
}