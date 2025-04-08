package com.iowa.receipt_backend.service;

import com.iowa.receipt_backend.model.Receipt;
import com.iowa.receipt_backend.repository.ReceiptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

@Service
public class ReceiptService {
    @Autowired
    private ReceiptRepository receiptRepository;

    public Receipt saveReceipt(Receipt receipt) throws Exception {
        try {
            return receiptRepository.save(receipt);
        } catch (DataAccessException ex) {

            ex.printStackTrace();
            throw new Exception("Database error occurred while saving receipt", ex);
        }
    }
}