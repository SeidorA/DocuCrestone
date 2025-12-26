---
iconName: "key"
title: "Key-pair"
description: "Create a node to export data from a source and load it into a destination."
---
import Admonition from '@theme/Admonition';

## Key-pair authentication and key-pair rotation

This topic describes using key pair authentication and key pair rotation in Snowflake.

## Overview

Snowflake supports using key pair authentication for enhanced authentication security as an alternative to basic authentication, such as username and password.

his authentication method requires, as a minimum, a 2048-bit RSA key pair. You can generate the Privacy Enhanced Mail (PEM) private-public key pair using OpenSSL. Some of the Supported Snowflake Clients allow using encrypted private keys to connect to Snowflake. The public key is assigned to the Snowflake user who uses the Snowflake client to connect and authenticate to Snowflake.

Snowflake also supports rotating public keys in an effort to allow compliance with more robust security and governance postures.

## Supported Snowflake clients

The following table summarizes support for key pair authentication among Snowflake Clients. A checkmark (✔) indicates full support. A missing checkmark indicates key pair authentication is not supported.

| Client | Key Pair Authentication | Key Pair Rotation | Unencrypted Private Keys |
| --- | --- | --- | --- |
| Snowflake CLI | ✅   | ✅   | ✅   |
| SnowSQL (CLI client) | ✅   | ✅   | ✅   |
| Snowflake Connector for Python | ✅   | ✅   | ✅   |
| Snowflake Connector for Spark | ✅   | ✅   | ✅   |
| Snowflake Connector for Kafka | ✅   | ✅   | ✅   |
| Go driver | ✅   | ✅   | ✅   |
| JDBC Driver | ✅   | ✅   | ✅   |
| ODBC Driver | ✅   | ✅   | ✅   |
| Node.js Driver | ✅   | ✅   | ✅   |
| .NET Driver | ✅   | ✅   | ✅   |
| PHP PDO Driver for Snowflake | ✅   | ✅   | ✅   |

## Configuring key-pair authentication

Complete the following steps to configure key pair authentication for all supported Snowflake clients.

### Generate the private key

Depending on which one of the Supported Snowflake Clients you use to connect to Snowflake, you have the option to generate encrypted or unencrypted private keys. Generally, it is safer to generate encrypted keys. Snowflake recommends communicating with your internal security and governance officers to determine which key type to generate prior to completing this step.


<Admonition type="tip">

The command to generate an encrypted key prompts for a passphrase to regulate access to the key. Snowflake recommends using a passphrase that complies with PCI DSS standards to protect the locally generated private key. Additionally, Snowflake recommends storing the passphrase in a secure location. If you are using an encrypted key to connect to Snowflake, enter the passphrase during the initial connection. The passphrase is only used for protecting the private key and will never be sent to Snowflake.  

</Admonition>

**To generate a long and complex passphrase based on PCI DSS standards:**
1.  Access the PCI Security Standards Document Library.
2.  For PCI DSS, select the most recent version and your desired language.
3.  Complete the form to access the document.
4.  Search for and follow the recommendations for password/passphrase requirements, testing, and guidance. Depending on the document version, the phrase is likely located in a section called or a similar name  
    `Passwords/passphrases must meet the following:Requirement 8: Identify and authenticate access to system components`

To start, open a terminal window and generate a private key.

You can generate either an encrypted version of the private key or an unencrypted version of the private key.

To generate an unencrypted version, use the following command:

```
openssl genrsa 2048 | openssl pkcs8 -topk8 -inform PEM -out rsa_key.p8 -nocrypt
```

To generate an encrypted version, use the following command, which omits :-nocrypt

```
openssl genrsa 2048 | openssl pkcs8 -topk8 -v2 des3 -inform PEM -out rsa_key.p8
```

The commands generate a private key in PEM format.

```
-----BEGIN ENCRYPTED PRIVATE KEY----- MIIE6T... -----END ENCRYPTED PRIVATE KEY-----
```

### Generate a public key

From the command line, generate the public key by referencing the private key. The following command assumes the private key is encrypted and contained in the file named.

```
openssl rsa -in rsa_key.p8 -pubout -out rsa_key.pub
```

The command generates the public key in PEM format.

```
-----BEGIN PUBLIC KEY-----
MIIBIj...  
-----END PUBLIC KEY-----
```


### Store the private and public keys securely

Copy the public and private key files to a local directory for storage. Record the path to the files. Note that the private key is stored using the PKCS#8 (Public Key Cryptography Standards) format and is encrypted using the passphrase you specified in the previous step.

However, the file should still be protected from unauthorized access using the file permission mechanism provided by your operating system. It is your responsibility to secure the file when it is not being used.

### Assign the public key to a Snowflake user

Execute an ALTER USER command to assign the public key to a Snowflake user.

```
ALTER USER example_user SET RSA_PUBLIC_KEY='MIIBIjANBgkqh...';
```


<Admonition type="note">      
- Only owners of a user, or users with the SECURITYADMIN role or higher can alter a user. For more information, see Overview of Access Control and GRANT OWNERSHIP  
- Exclude the public key delimiters in the SQL statement.
</Admonition>

### Verify the user’s public key fingerprint

1.  Execute the following command to retrieve the user’s public key fingerprint:

```
DESC USER example_user;
SELECT SUBSTR((SELECT "value" FROM TABLE(RESULT_SCAN(LAST_QUERY_ID()))
WHERE "property" = 'RSA_PUBLIC_KEY_FP'), LEN('SHA256:') + 1);
```
Output

```
Azk1Pq...
```

1.  Copy the output.
2.  Run the following command on the command line:

```
openssl rsa -pubin -in rsa_key.pub -outform DER | openssl dgst -sha256 -binary | openssl enc -base64
```


Output

```
writing RSA key
Azk1Pq...
```

1.  Compare both outputs. If both outputs match, the user correctly configured their public key.

### Configure the Snowflake client to use key-pair authenticatio

Update the client to use key pair authentication to connect to Snowflake.
-   Snowflake CLI
-   SnowSQL
-   Python connector
-   Spark connector
-   Kafka connector
-   Go driver
-   JDBC driver
-   ODBC driver
-   .NET driver
-   Node.js Driver

## Configuring key-pair rotation

Snowflake supports multiple active keys to allow for uninterrupted rotation. Rotate and replace your public and private keys based on the expiration schedule you follow internally.

Currently, you can use the and parameters for ALTER USER to associate up to 2 public keys with a single `user.RSA_PUBLIC_KEYRSA_PUBLIC_KEY_2`

Complete the following steps to configure key pair rotation and rotate your keys.

1.  Complete all steps in Configuring key-pair authentication with the following updates:

-   Generate a new private and public key set.
-   Assign the public key to the user. Set the public key value to either or , whichever key value is not currently in use. For example:RSA\_PUBLIC\_KEYRSA\_PUBLIC\_KEY\_2

```
ALTER USER example_user SET RSA_PUBLIC_KEY_2='JERUEHtcve...';
```

Update the code to connect to Snowflake. Specify the new private key.  
Snowflake verifies the correct active public key for authentication based on the private key submitted with your connection information.

Remove the old public key from the user profile using an ALTER USER command.

```
ALTER USER example_user UNSET RSA_PUBLIC_KEY;
```