import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface EmailVerifyProps {
  user: string;
  verificationLink: string;
}

const cdnUrl = process.env.NEXT_PUBLIC_CDN;

export const EmailVerify = ({ user, verificationLink }: EmailVerifyProps) => {
  return (
    <Html lang="pl">
      <Head />
      <Preview>
        Dziękujemy za rejestrację w ezInstaling. Aby dokończyć proces, prosimy o
        potwierdzenie swojego adresu email.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${cdnUrl}/logo.png`}
            width="90"
            height="60"
            alt="ezInstaling"
            style={logo}
          />
          <Hr style={hr} />
          <Text style={paragraph}>Cześć {user},</Text>
          <Text style={paragraph}>
            Dziękujemy za rejestrację w ezInstaling. Aby dokończyć proces,
            prosimy o potwierdzenie swojego adresu email.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={verificationLink}>
              Potwierdź adres e-mail
            </Button>
          </Section>
          <Text style={paragraph}>Pozdrawiamy, ezInstaling</Text>
          <Hr style={hr} />
          <Text style={footer}>
            ezInstaling, wiadomość wysłana automatycznie, prosimy na nią nie
            odpowiadać.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

EmailVerify.PreviewProps = {
  user: "rvyk",
  verificationLink:
    "https://v3.ezinstaling.pl/auth/verify?token=0000-0000-0000-0000-0000",
} as EmailVerifyProps;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#fae8ca",
  borderRadius: "8px",
  color: "#faa516",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
