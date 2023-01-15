var dbConn = require('../../../../config/db.config');
const PDFDocument = require('pdfkit');
const fs = require('fs');

var invoiceModal = {
    generateInvoice:{},
}

const invoice = {
	shipping: {
		name: 'REZA SHASHI',
		address: '1234 Main Street',
		city: 'San Francisco',
		state: 'CA',
		country: 'US',
		postal_code: 94111,
	},
	items: [
		{
			month: 'DECEMBER ',
			description: ' 1 to 30 december 2022',
			status:'UNPAID',
			amount: 6000,
		},
	],
	subtotal: 8000,
	paid: 0,
	invoice_nr: 1234,
};

function generateHeader(doc) {
  doc.rect(30,38,550,60).fill('#DDFBF9')
    .image('logo.png', 50, 45, { width: 50 })
		.fillColor('orange')
		.fontSize(30)
    .font('Courier')
		.text('flamingo.in', 110, 57,{color:'red'})
		.fillColor('blue')
		.fontSize(10)
		.text('DLF - 5', 200, 50, { align: 'right' })
		.text('Street No 37', 200, 65, { align: 'right' })
		.text('New Town , Kolakta West , Bengal', 200, 80, { align: 'right' })
   
	  //.moveDown();

    return true
}

function generateFooter(doc) {
  doc.fillColor('grey')
	doc.fontSize(
		10,
	).text(
		'Payment is due , please pay within 15 days. Thank you for your business.',
		50,
		650,
		{ align: 'center', width: 500 },
	)
  doc.fillColor('blue')
  doc.fontSize(
		10,
	).text(
		'______________________________________________________________________________',
		50,
		700,
		{ align: 'center', width: 500 },
	)
  doc.fillColor('grey')
  doc.fontSize(
		10,
	).text(
		'For any queries please reach out to us at www.falingo.in/help.',
		50,
		720,
		{ align: 'center', width: 500 },
	)
  return true

}

function generateCustomerInformation(doc) {
	const shipping = invoice.shipping;
      doc.fontSize(18).text(`INVOICE __________`,50,160)
      .fontSize(12)
      .fillColor('black')
	    .text(`Invoice Number: ${invoice.invoice_nr}`, 50, 200)
      .text(`Invoice Date: ${new Date().getTime()}`, 50, 215)
      .text(`Balance Due: ${invoice.subtotal - invoice.paid}`, 50, 230)
      .text(`GSTIN : 12sting25d#145wdsd52d5e5`, 50, 245)
      .text(shipping.name, 350, 200)
      .text(shipping.address, 350, 215)
      .text(`Contact : 887772626`, 350, 230)
      .text(
        `${shipping.city}, ${shipping.state}, ${shipping.country}`,
        350,
        245,
      )

		//  .moveDown();
    return true

}

function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
	doc.fontSize(12)
    .fillColor('black')
		.text(c1, 50, y)
		.text(c2, 150, y)
		.text(c3, 360, y, { width: 90, align: 'right' })
		.text(c4, 440, y, { width: 90, align: 'right' })
	//	.text(c5, 0, y,   { align: 'right' })
    .rect(30,300,550,90).stroke()


    return true

}
function generateInvoiceTable(doc) {
	let i,
		invoiceTableTop = 330;

	for (i = 0; i < invoice.items.length; i++) {
		const item = invoice.items[i];
		const position = invoiceTableTop + (i + 1) * 30;
		generateTableRow(
			doc,
			position,
			item.month,
			item.description,
			item.status,
			item.amount,
		);
	}
  return true

}
invoiceModal.generateInvoice = async( req , result )=>{

  let doc = new PDFDocument({ margin: 50 });

	let a = generateHeader(doc); // Invoke `generateHeader` function.
  if(a == true){
      let b = generateCustomerInformation(doc)
      if( b == true){
          let c = generateTableRow(doc,320,'MONTH',"DESCRIPTION","STATUS","TOTAL")
          if( c == true){
                let d = generateInvoiceTable(doc)
                if( d == true){
                    let e = generateFooter(doc); // Invoke `generateFooter` function.
                    if(e == true){
                          doc.end();
                          
                          result(null ,doc.pipe(fs.createWriteStream('invoice.pdf'))) 
                    }
                }
          }
          
      }

  }
 



}


//*******************    EXPORTING   ***************** */
module.exports = invoiceModal;