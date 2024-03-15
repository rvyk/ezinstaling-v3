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

interface ResetPasswordProps {
  user: string;
  resetLink: string;
}

const cdnUrl = process.env.NEXT_PUBLIC_CDN;

export const ResetPassword = ({ user, resetLink }: ResetPasswordProps) => {
  return (
    <Html lang="pl">
      <Head />
      <Preview>Zresetuj swoje hasło w ezInstaling.pl</Preview>
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
            Otrzymujesz tę wiadomość, ponieważ poprosiłeś o zresetowanie hasła
            do swojego konta.
            <br />
            Aby ustawić nowe hasło, kliknij poniższy przycisk:
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={resetLink}>
              Zresetuj hasło
            </Button>
          </Section>
          <Text style={paragraph}>
            Jeśli nie prosiłeś o reset hasła, zignoruj tę wiadomość.
            <br />
            Pozdrawiamy, ezInstaling
          </Text>
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

ResetPassword.PreviewProps = {
  user: "rvyk",
  resetLink:
    "https://v3.ezinstaling.pl/auth/reset-password?token=0000-0000-0000-0000-0000",
} as ResetPasswordProps;

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
