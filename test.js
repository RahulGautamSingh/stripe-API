const readlineSync = require('readline-sync');
const stripe = require('stripe')('sk_test_51IitI3SCmmngPZ4ybBrgVOy7obJx1J7rafGugk5BuqO9xeXcnhqcSoL2eygTyk5NmiVuQ8Eg7e0dSVIa6fR0GkHr00Y19netNd');

async function run()
{
    let cardNum = readlineSync.question("Enter your card number:");
    let expMonth = readlineSync.question("Enter card expiry month:");
    let expYear = readlineSync.question("Enter card expiry year:");
    let  cvvCode = readlineSync.question("Enter card CVV code:");

    const token = await stripe.tokens.create({
      card: {
        number: '4242424242424242',
    exp_month: 4,
    exp_year: 2022,
    cvc: '314'
      },
    });

    console.log("Created card token with id: "+token.id)
    const charge = await stripe.charges.create({
        amount: 2000,
        currency: 'inr',
        source: token.id,
        description: 'My First Test Charge (created for API docs)',
      });
      console.log("Created charge with id:"+charge.id)
}

run();