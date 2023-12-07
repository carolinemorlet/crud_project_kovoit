import { Injectable } from '@nestjs/common';
import * as SibApiV3Sdk from 'sib-api-v3-typescript';
import { SendSmtpEmail } from 'sib-api-v3-typescript';
import { EmailDto } from './dto/email.dto';

@Injectable()
export class EmailService {
  private readonly sendinblue: SibApiV3Sdk.TransactionalEmailsApi;

  constructor() {
    this.sendinblue = new SibApiV3Sdk.TransactionalEmailsApi();
    this.sendinblue.setApiKey(
      SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_KEY,
    );
  }

  async sendEmail(data: EmailDto): Promise<any> {
    try {
      const email = new SendSmtpEmail();
      email.subject = data.subject;
      email.sender = data.sender;
      email.to = data.to;
      email.params = data.params;
      email.templateId = data.templateId;

      return await this.sendinblue.sendTransacEmail(data);
    } catch (error) {
      throw new Error('Failed to send email');
    }
  }
}
