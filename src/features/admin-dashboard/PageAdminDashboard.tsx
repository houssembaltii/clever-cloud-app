import React from 'react';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Heading,
  Stack,
  Text,
  Wrap,
} from '@chakra-ui/react';
import {
  fetchAccessToken as doFetchAccessToken,
  fetchRequestToken as doFetchRequestToken, //@ts-expect-error it has no declaration file
} from '@clevercloud/client/esm/login';
//@ts-expect-error it has no declaration file
import { prefixUrl } from '@clevercloud/client/esm/prefix-url';
//@ts-expect-error it has no declaration file
import { request } from '@clevercloud/client/esm/request.fetch';
import { useSearchParams } from 'next/navigation';
import { Trans, useTranslation } from 'react-i18next';
import { LuAlertCircle, LuBookOpen, LuGithub } from 'react-icons/lu';

import { env } from '@/env.mjs';
import {
  AdminLayoutPage,
  AdminLayoutPageContent,
} from '@/features/admin/AdminLayoutPage';

export default function PageAdminDashboard() {
  const { t } = useTranslation(['adminDashboard']);
  const searchparams = useSearchParams();
  const ouath_verifier = searchparams.get('oauth_verifier') ?? '';

  function sendToApi(requestParams: unknown) {
    const API_HOST = 'https://api.clever-cloud.com';

    console.log(requestParams);
    return Promise.resolve(requestParams)
      .then(prefixUrl(API_HOST))
      .then(request);
  }

  const handleOnClick = async () => {
    const CONSUMER_KEY = env.NEXT_PUBLIC_CONSUMER_KEY;
    const CONSUMER_SECRET = env.NEXT_PUBLIC_CONSUMER_SECRET;
    const oauthCallback = 'http://localhost:3000/api/callbacks';
    const request_token = await doFetchRequestToken({
      consumerKey: CONSUMER_KEY,
      consumerSecret: CONSUMER_SECRET,
      oauthCallback: oauthCallback,
    }).then(sendToApi);
    console.log(request_token);
    localStorage.setItem('oauth_token', request_token.oauth_token);
    localStorage.setItem(
      'oauth_token_secret',
      request_token.oauth_token_secret
    );
    window.open(
      `https://api.clever-cloud.com/v2/oauth/authorize?oauth_token=${request_token.oauth_token}`,
      '_blank'
    );
  };
  const handlegetaccesstoken = async () => {
    const access_token = await doFetchAccessToken({
      consumerKey: env.NEXT_PUBLIC_CONSUMER_KEY,
      consumerSecret: env.NEXT_PUBLIC_CONSUMER_SECRET,
      tokenSecret: localStorage.getItem('oauth_token_secret'),
      oauthToken: localStorage.getItem('oauth_token'),
      oauthVerifier: ouath_verifier,
    }).then(sendToApi);
    console.log(access_token);
  };
  return (
    <AdminLayoutPage>
      <AdminLayoutPageContent>
        <Heading size="md" mb="4">
          {t('adminDashboard:title')}
        </Heading>
        <Stack spacing={4}>
          <Alert status="success" colorScheme="brand" borderRadius="md">
            <AlertIcon />
            <Box flex="1">
              <AlertTitle fontSize="lg">
                {t('adminDashboard:welcome.title')}
              </AlertTitle>
              <AlertDescription display="block">
                {t('adminDashboard:welcome.description')}
                <br />
                <Text as="a" href="https://www.bearstudio.fr">
                  <Trans t={t} i18nKey="adminDashboard:welcome.author" />
                </Text>
              </AlertDescription>
            </Box>
          </Alert>
          <Wrap spacing={2}>
            <Button
              size="sm"
              as="a"
              href="https://github.com/BearStudio/start-ui-web"
              leftIcon={<LuGithub />}
            >
              {t('adminDashboard:links.github')}
            </Button>
            <Button
              size="sm"
              as="a"
              href="https://docs.web.start-ui.com"
              leftIcon={<LuBookOpen />}
            >
              {t('adminDashboard:links.documentation')}
            </Button>
            <Button
              size="sm"
              as="a"
              href="https://github.com/BearStudio/start-ui/issues/new"
              leftIcon={<LuAlertCircle />}
            >
              {t('adminDashboard:links.openIssue')}
            </Button>
            <Button
              size="sm"
              as="a"
              leftIcon={<LuAlertCircle />}
              onClick={handleOnClick}
            >
              get_request_token + open authorization url
            </Button>
            <Button
              size="sm"
              as="a"
              leftIcon={<LuAlertCircle />}
              onClick={handlegetaccesstoken}
            >
              get_access_token
            </Button>
          </Wrap>
        </Stack>
      </AdminLayoutPageContent>
    </AdminLayoutPage>
  );
}
