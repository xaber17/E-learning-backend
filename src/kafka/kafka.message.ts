export class KafkaPayload {
  public body: any;
  public messageId: string;
  public messageType: string;
  public topicName: string;
  public createdTime?: string;

  create?(messageId, body, messageType, topicName): KafkaPayload {
    return {
      messageId,
      body,
      messageType,
      topicName,
      createdTime: new Date().toISOString(),
    };
  }
}

export class KafkaSimplePayload {
  public key: string;
  public value: string;

  create?(key: string, data: Record<string, any>): KafkaSimplePayload {
    return {
      key,
      value: JSON.stringify(data),
    };
  }
}

export declare class KafkaConfig {
  isGlobal?: boolean;
  clientId: string;
  brokers: string[];
  groupId: string;
}
