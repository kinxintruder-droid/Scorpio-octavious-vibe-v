match /withdrawals/{id} {
  allow create: if request.auth != null
    && request.resource.data.amount > 0
    && request.resource.data.amount <= 1000;
}