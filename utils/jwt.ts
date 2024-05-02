// This util is to generate JWTs.
// THIS IS NOT A SAFE OPERATION TO DO IN YOUR APP IN PRODUCTION.
// JWTs should be provided by a backend server as they require a secret
// WHICH IS NOT SAFE TO STORE ON DEVICE!


import moment from 'moment';
import KJUR from 'jsrsasign'
import { sign } from 'react-native-pure-jwt';
const sdkKey = 'TK0BRmYKSSKPpKMojbxMOw';
const sdkSecret = 'csHyInyKwU1pq9UOPiXtCqdso4rxyvmb';

function makeId(length: number) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const generateSignature = (meetingNumber: number, role: number) => {

  const iat = Math.round(new Date().getTime() / 1000) - 30
  const exp = iat + 60 * 60 * 2
  const oHeader = { alg: 'HS256', typ: 'JWT' }

  const oPayload = {
    sdkKey: sdkKey,
    appKey: sdkKey,
    // mn: meetingNumber,
    role: role,
    iat: iat,
    exp: exp,
    tokenExp: exp
  }

  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkSecret)
  return sdkJWT
}


export default async function generateJwt(
  sessionName: number,
  roleType: string
) {
  try {
    // const iat = new Date().getTime()
    // const exp = new Date(Date.now() + 23 * 3600 * 1000).getTime()


    const iat = moment().valueOf();
    const exp = moment().add(1800, 'seconds').valueOf();
    // const iat = Math.round(new Date().getTime() / 1000) - 30
    // const exp = iat + 60 * 60 * 2
    console.log({
      appKey: sdkKey,
      sdkKey: sdkKey,
      mn: sessionName,
      role: 0,
      iat: iat,
      exp: exp,
      tokenExp: exp,
    })
    const token = await sign(
      {
        appKey: sdkKey,
        sdkKey: sdkKey,
        mn: sessionName,
        role: 0,
        iat: iat,
        exp: exp,
        tokenExp: exp,
      },
      sdkSecret,
      {
        alg: 'HS256',
      }
    );
    return token;
  } catch (e) {
    console.log(e);
    return '';
  }
}
