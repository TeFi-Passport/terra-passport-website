export const savePassportImageToIPFS = async (address, chainId, score, height) => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const res = await fetch(`https://947o3z5ei5.execute-api.us-east-2.amazonaws.com/default/ipfs_pipeline?address=${address}&chainId=${chainId}&height=${height}&score=${score}`, requestOptions)
    return await res.json();
}

/**
 *
 * @param {string} hash
 * @return {string} link
 */
export const getJSONDataLinkFromIPFSHash = (hash) => {
    return `https://gateway.pinata.cloud/ipfs/${hash}`;
}

/**
 *
 * @param {string} link
 * @return {string} link
 */
export const getImageLinkFromIPFSLink = async (link) => {

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const res = await fetch(link, requestOptions);
    const json = await res.json();

    return `https://gateway.pinata.cloud/ipfs/${json.image.replace('ipfs://', '')}`;

}