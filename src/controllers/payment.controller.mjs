import PaymentModel from "../models/payment.model.mjs";
class PaymentController {
  // function to add payment
  static addPayment = async (req, res) => {
    try {
      const payment = new PaymentModel({
        date: Date.now().toLocaleString(),
        amount_paid: req.body.amount,
        balance: req.body.balance,
        tenant: req.body.tenant,
      });
      await payment.save();
      res.status(200).json({ message: payment });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  // function to update payment
  static updatePayment = async (req, res) => {
    try {
      console.log(req.params.id);
      const oldPaymentRecord = await PaymentModel.findById(req.params.id);
      if (oldPaymentRecord) {
        const updatedPaymentRecord = await PaymentModel.findByIdAndUpdate(
          req.params.id,
          {
            date: req.body.date,
            amount_paid: req.body.amount,
            balance: req.body.balance,
            tenant: req.body.tenant,
          },
          { new: true }
        );
        res.status(200).json({ message: updatedPaymentRecord });
      } else {
        res.status(400).json({ message: "Payment not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  // function to get all payments
  static getAllPayments = async (req, res) => {
    try {
      const payments = await PaymentModel.find()
        .where({ tenant: req.params.id })
        .sort({ createdAt: -1 });
      res.status(200).json(payments);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  // function to return only the last record inserted
  static getLastPayment = async (req, res) => {
    try {
      const payment = await PaymentModel.findOne().where({ tenant: req.params.id }).sort({ createdAt: -1 });
      if (payment) {
        res.status(200).json(payment);
      } else {
         res.status(400).json({ message: "Payment not found" });
      }
    } catch (err) {
       res.status(500).json({ message: err.message });
    }
  }

  // function to delete a payment
  static deletePayment = async (req, res) => {
    try {
      const payment = await PaymentModel.findByIdAndDelete(req.params.id);
      if (payment) {
        res.status(200).json({ message: "Payment deleted successfully" });
      } else {
        res.status(400).json({ message: "Payment not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  // function to return last record first
}

export default PaymentController;
