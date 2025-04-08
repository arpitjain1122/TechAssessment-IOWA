package com.iowa.receipt_backend.controller;
import com.iowa.receipt_backend.model.Receipt;
import com.iowa.receipt_backend.service.ReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDate;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/receipts")
public class ReceiptController {

    @Autowired
    private ReceiptService receiptService;

    @PostMapping(consumes = {"multipart/form-data"})
    public Receipt submitReceipt(
            @RequestParam("date") String date,
            @RequestParam("amount") String amount,
            @RequestParam("description") String description,
            @RequestParam("receipt") MultipartFile receiptFile) {

        try {
            Receipt receipt = new Receipt();
            receipt.setDate(LocalDate.parse(date));
            receipt.setAmount(new BigDecimal(amount));
            receipt.setDescription(description);
            receipt.setReceiptFile(receiptFile.getBytes());
            return receiptService.saveReceipt(receipt);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error processing receipt submission", ex);
        }
    }
}