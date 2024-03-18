'use client';

import React from 'react';

import { Text } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import OAuth from 'oauth-1.0a';

import {
  AdminLayoutPage,
  AdminLayoutPageContent,
} from '@/features/admin/AdminLayoutPage';

export default function TokensPage() {
  const searchparams = useSearchParams();
  const ouath_verifier = searchparams.get('oauth_verifier');
  const getOauthParams = ({
    consumerKey,
    consumerSecret,
    tokenSecret = '',
  }: {
    consumerKey: string;
    consumerSecret: string;
    tokenSecret?: string;
  }) => {
    // We need this for getNonce()
    OAuth.prototype.nonce_length = 32;
    return {
      oauth_consumer_key: consumerKey,
      oauth_signature_method: 'PLAINTEXT',
      oauth_signature: consumerSecret + '&' + tokenSecret,
      oauth_timestamp: OAuth.prototype.getTimeStamp(),
      oauth_nonce: OAuth.prototype.getNonce(),
    };
  };
  const handleOnClick = async () => {
    const CONSUMER_KEY = '4BX7i6dcVNoSLOSKfMCjIYmVNBMXgD';
    const CONSUMER_SECRET = 'Npm6vSVWb9Nk94Is2bNDArQP0kJLMp';

    const url = 'https://api.clever-cloud.com/v2/oauth/access_token';
    const body = {
      ...getOauthParams({
        consumerKey: CONSUMER_KEY,
        consumerSecret: CONSUMER_SECRET,
      }),
      oauth_callback: 'http://localhost:3000/api/callbacks',
    };
    const formdata = new URLSearchParams();
    formdata.append('oauth_consumer_key', body.oauth_consumer_key);
    formdata.append('oauth_signature_method', body.oauth_signature_method);
    formdata.append('oauth_signature', body.oauth_signature);
    formdata.append('oauth_timestamp', body.oauth_timestamp.toString());
    formdata.append('oauth_nonce', body.oauth_nonce);
    formdata.append('oauth_callback', 'http://localhost:3000/api/callbacks');
    for (const [key, value] of formdata.entries()) {
      console.log(`${key}: ${value}`);
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formdata,
    });
    const pairs = (await response.text()).split('&');
    const oauth_token = pairs[0]?.split('=')[1];
    const oauth_token_secret = pairs[1]?.split('=')[1];
    const oauth_callback_confirmed = pairs[2]?.split('=')[1];

    window.open(
      `https://api.clever-cloud.com/v2/oauth/authorize?oauth_token=${oauth_token}`,
      '_blank'
    );
  };
  return (
    <AdminLayoutPage>
      <AdminLayoutPageContent>
        {/* <Stack spacing={4}>
    <HStack spacing={4} alignItems={{ base: 'end', md: 'center' }}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        rowGap={2}
        columnGap={4}
        alignItems={{ base: 'start', md: 'center' }}
        flex={1}
      >
        <Heading flex="none" size="md">
          {t('repositories:list.title')}
        </Heading>
        <SearchInput
          value={searchTerm}
          size="sm"
          onChange={(value) => setSearchTerm(value || null)}
          maxW={{ base: 'none', md: '20rem' }}
        />
      </Flex>
      <ResponsiveIconButton
        as={LinkAdmin}
        href="/repositories/create"
        variant="@primary"
        size="sm"
        icon={<LuPlus />}
      >
        {t('repositories:list.actions.createRepository')}
      </ResponsiveIconButton>
    </HStack>

    <DataList>
      {repositories.isLoading && <DataListLoadingState />}
      {repositories.isError && (
        <DataListErrorState
          title={t('repositories:feedbacks.loadingRepositoryError.title')}
          retry={() => repositories.refetch()}
        />
      )}
      {repositories.isSuccess &&
        !repositories.data.pages.flatMap((p) => p.items).length && (
          <DataListEmptyState searchTerm={searchTerm}>
            {t('repositories:list.empty')}
          </DataListEmptyState>
        )}

      {repositories.data?.pages
        .flatMap((p) => p.items)
        .map((repository) => (
          <DataListRow as={LinkBox} key={repository.id} withHover>
            <DataListCell w="auto">
              <Icon icon={LuBookMarked} fontSize="xl" color="gray.400" />
            </DataListCell>
            <DataListCell>
              <DataListText fontWeight="bold">
                <LinkOverlay
                  as={LinkAdmin}
                  href={`/repositories/${repository.id}`}
                >
                  {repository.name}
                </LinkOverlay>
              </DataListText>
              <DataListText color="text-dimmed">
                {repository.link}
              </DataListText>
            </DataListCell>
            <DataListCell flex={2} display={{ base: 'none', md: 'flex' }}>
              <DataListText noOfLines={2} color="text-dimmed">
                {repository.description}
              </DataListText>
            </DataListCell>
            <DataListCell w="auto">
              <AdminRepositoryActions repository={repository} />
            </DataListCell>
          </DataListRow>
        ))}
      {repositories.isSuccess && (
        <DataListRow mt="auto">
          <DataListCell w="auto">
            <Button
              size="sm"
              onClick={() => repositories.fetchNextPage()}
              isLoading={repositories.isFetchingNextPage}
              isDisabled={!repositories.hasNextPage}
            >
              {t('repositories:list.loadMore.button')}
            </Button>
          </DataListCell>
          <DataListCell>
            {repositories.isSuccess &&
              !!repositories.data.pages[0]?.total && (
                <Text fontSize="xs" color="text-dimmed">
                  <Trans
                    i18nKey="repositories:list.loadMore.display"
                    t={t}
                    values={{
                      loaded: repositories.data.pages.flatMap(
                        (p) => p.items
                      ).length,
                      total: repositories.data.pages[0].total,
                    }}
                  />
                </Text>
              )}
          </DataListCell>
        </DataListRow>
      )}
    </DataList>
  </Stack> */}
        <Text>{ouath_verifier}</Text>
      </AdminLayoutPageContent>
    </AdminLayoutPage>
  );
}
