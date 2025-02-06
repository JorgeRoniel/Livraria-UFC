using Grpc.Core;
using System.Threading.Tasks;
using Payments;

namespace PaymentService.Services;


public class PaymentServices : Payments.Payment.PaymentBase
{
    public override Task<PaymentResponse> ProcessPayment(PaymentRequest payment, ServerCallContext context)
    {
        return Task.FromResult(new PaymentResponse
        {
            Success = true,
            Message = "Payment success!"
        });
    }
}