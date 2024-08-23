// #region ---- Core Imports ----
import React, { useCallback, useMemo, useState } from "react";

// #endregion

// #region ---- Packages Imports ----
import {
  ZAvatar,
  ZBox,
  ZButton,
  ZCard,
  ZCheckbox,
  ZDataList,
  ZFlex,
  ZHeading,
  ZInput,
  ZModal,
  ZPagination,
  ZRUAlignE,
  ZRUAvatarVariantE,
  ZRUColorE,
  ZRUDirectionE,
  ZRUInputTypeE,
  ZRUJustifyE,
  ZText,
  ZTextArea,
  showErrorNotification,
  showSuccessNotification,
} from "zaions-react-ui-kit";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRecoilValue } from "recoil";
import { Formik, Form, FormikHelpers } from "formik";
import { ZodError } from "zod";
import { IApiResponse } from "zaions-react-tool-kit";
import {
  isZNonEmptyString,
  ResponseCodeEnum,
  ResponseStatusEnum,
  zStringify,
} from "zaions-tool-kit";

// #endregion

// #region ---- Custom Imports ----
import constants from "@/utils/constants";
import {
  useDeleteRequest,
  useGetRequest,
  usePostRequest,
  usePutRequest,
} from "@/hooks/reactQuery";
import { ApiPathEnum } from "@/enums/backendApi";
import { reactQueryKeys } from "@/utils/constants/reactQuery";
import { ZFormModeE } from "@/types/generic";
import FormActionButtons from "@/components/form/FormActionButtons";
import { gameFormValidationSchema } from "@/validationSchema";
import { formValidationRStateAtom } from "@/state/formState";
import { MESSAGES } from "@/utils/messages";
import ZSearch from "@/components/private/Search";
import ZTable from "@/components/private/Table";

// #endregion

// #region ---- Types Imports ----
import { IGame, ZGameTableColumnsIds } from "@/types/game";

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZAddIcon, ZWarningOutlineIcon } from "@/assets";

// #endregion

const Game: React.FC = () => {
  const [compState, setCompState] = useState<{
    deleteModal: {
      open: boolean;
    };
    formModal: {
      open: boolean;
      mode?: ZFormModeE;
    };
    viewModal: {
      open: boolean;
    };
    selectedItem?: IGame;
  }>({
    deleteModal: {
      open: false,
    },
    formModal: {
      open: false,
      mode: ZFormModeE.add,
    },
    viewModal: {
      open: false,
    },
  });
  const formValidationRState = useRecoilValue(formValidationRStateAtom);

  // #region Apis Queries
  const { data: allGamesData, isFetching: isGamesDataFetching } = useGetRequest<
    Array<IGame>
  >({
    url: ApiPathEnum.listGames,
    queryKey: [reactQueryKeys.game.getAll],
    isAuthenticatedRequest: true,
  });

  const { mutateAsync: createGameMutateAsync, isPending: isCreateGamePending } =
    usePostRequest<IGame>({
      queriesToInvalidate: [reactQueryKeys.game.getAll],
    });

  const { mutateAsync: updateGameMutateAsync, isPending: isUpdateGamePending } =
    usePutRequest<IGame>({
      queriesToInvalidate: [reactQueryKeys.game.getAll],
    });

  const { mutateAsync: deleteGameMutateAsync, isPending: isDeleteGamePending } =
    useDeleteRequest({
      queriesToInvalidate: [reactQueryKeys.game.getAll],
    });
  // #endregion

  // #region Managing table
  const columnHelper = createColumnHelper<IGame>();

  const _gameTableColumn = [
    columnHelper.display({
      id: ZGameTableColumnsIds.id,
      header: () => {
        return <ZCheckbox />;
      },
      cell: (props) => {
        return <ZCheckbox />;
      },
    }),

    columnHelper.accessor((itemData) => itemData.title, {
      header: "Title",
      id: ZGameTableColumnsIds.title,
      cell: (row) => {
        return (
          <ZText>
            {isZNonEmptyString(row.getValue())
              ? row.getValue()
              : constants.defaultValue.fallbackValue}
          </ZText>
        );
      },
    }),

    columnHelper.accessor((itemData) => itemData.personsAllowed, {
      header: "Persons allowed",
      id: ZGameTableColumnsIds.personsAllowed,
      cell: (row) => {
        return (
          <ZText>
            {row.getValue() ?? constants.defaultValue.fallbackValue}
          </ZText>
        );
      },
    }),

    columnHelper.accessor((itemData) => itemData.feePerPerson, {
      header: "Fee per person",
      id: ZGameTableColumnsIds.feePerPerson,
      cell: (row) => {
        return (
          <ZText>
            {row.getValue() ?? constants.defaultValue.fallbackValue}
          </ZText>
        );
      },
    }),

    columnHelper.accessor((itemData) => itemData.serviceCharges, {
      header: "Service charges",
      id: ZGameTableColumnsIds.serviceCharges,
      cell: (row) => {
        return (
          <ZText>
            {row.getValue() ?? constants.defaultValue.fallbackValue}
          </ZText>
        );
      },
    }),
  ];

  const _gamesData = useMemo(
    () => allGamesData?.result?.data ?? [],
    [allGamesData]
  );

  const gameTable = useReactTable({
    columns: _gameTableColumn,
    data: _gamesData,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageSize: 100,
        pageIndex: 0,
      },
    },
  });
  // #endregion

  // #region functions
  const formModalValidationHandler = useCallback((values: IGame) => {
    if (formValidationRState.frontendFormValidationIsEnabled) {
      try {
        gameFormValidationSchema.parse(values);
      } catch (error) {
        if (error instanceof ZodError) {
          return error.formErrors.fieldErrors;
        }
      }
    }
  }, []);

  const formModalSubmitHandler = useCallback(
    async (values: IGame, { setErrors }: FormikHelpers<IGame>) => {
      const reqData = zStringify({
        title: values.title,
        description: values.description,
        personsAllowed: values.personsAllowed,
        feePerPerson: values.feePerPerson,
        serviceCharges: values.serviceCharges,
        image: values.image,
      });

      try {
        let _response;
        if (compState?.formModal?.mode === ZFormModeE.add) {
          _response = await createGameMutateAsync({
            apiPath: ApiPathEnum.createGame,
            data: reqData,
            isAuthenticatedRequest: true,
          });
        } else {
          _response = await updateGameMutateAsync({
            apiPath: ApiPathEnum.updateGame,
            data: reqData,
            itemId: compState?.selectedItem?.id,
            isAuthenticatedRequest: true,
          });
        }

        if (_response?.status === ResponseStatusEnum.success) {
          setCompState((oldState) => ({
            ...oldState,
            formModal: {
              open: false,
            },
          }));

          showSuccessNotification(
            compState?.formModal?.mode === ZFormModeE.add
              ? MESSAGES.game.createdSuccessfully
              : MESSAGES.game.updatedSuccessfully
          );
        }
      } catch (error) {
        const _error = error as IApiResponse<IGame>;
        if (_error?.code === ResponseCodeEnum?.badRequest) {
          const _errors = _error?.errors;
          if (_errors) {
            setErrors(_errors);
          }
        }
      }
    },
    [compState?.selectedItem?.id, compState?.formModal?.mode]
  );

  const handleDeleteConfirm = useCallback(async () => {
    try {
      const _response = await deleteGameMutateAsync({
        apiPath: ApiPathEnum.deleteGame,
        isAuthenticatedRequest: true,
        itemId: compState?.selectedItem?.id,
      });

      if (_response?.status === ResponseStatusEnum.success) {
        setCompState((oldState) => ({
          ...oldState,
          deleteModal: {
            open: false,
          },
        }));

        showSuccessNotification(MESSAGES.game.deletedSuccessfully);
      }
    } catch (error) {
      const _error = error as IApiResponse<unknown>;
      if (_error?.code === ResponseCodeEnum?.notFound) {
        showErrorNotification(MESSAGES.game.notFount);
      }
    }
  }, [compState?.selectedItem?.id]);
  // #endregion

  const formModalInitialValues = useMemo<IGame>(
    () => ({
      title: compState?.selectedItem?.title ?? "",
      description: compState?.selectedItem?.description ?? "",
      image: compState?.selectedItem?.image ?? "",
      personsAllowed: compState?.selectedItem?.personsAllowed ?? 0,
      feePerPerson: compState?.selectedItem?.feePerPerson ?? 0,
      serviceCharges: compState?.selectedItem?.serviceCharges ?? 0,
    }),
    [compState?.selectedItem]
  );

  return (
    <>
      <ZBox className="px-2 py-2">
        <ZFlex align={ZRUAlignE.center} justify={ZRUJustifyE.between}>
          <ZHeading className="text-4xl font-medium tracking-wider">
            Games
          </ZHeading>

          <ZButton
            onClick={() => {
              setCompState((oldState) => ({
                ...oldState,
                formModal: {
                  ...oldState?.formModal,
                  open: true,
                },
              }));
            }}
          >
            <ZAddIcon className="w-5 h-5" /> Add Game
          </ZButton>
        </ZFlex>
      </ZBox>

      <ZBox className="mt-5">
        <ZCard>
          <ZFlex align={ZRUAlignE.center}>
            <ZSearch />
          </ZFlex>
        </ZCard>

        <ZBox className="mt-4">
          <ZTable<IGame>
            table={gameTable}
            selectId={ZGameTableColumnsIds.id}
            inProcessing={isGamesDataFetching}
            PopoverContent={(_rowInfo) => {
              return (
                <>
                  <ZButton
                    className="mb-3"
                    size="1"
                    onClick={() => {
                      setCompState((oldVal) => ({
                        ...oldVal,
                        viewModal: {
                          open: true,
                        },
                        selectedItem: _rowInfo?.original,
                      }));
                    }}
                  >
                    View
                  </ZButton>
                  <ZButton
                    className="mb-3"
                    color={ZRUColorE.violet}
                    size="1"
                    onClick={() => {
                      setCompState((oldVal) => ({
                        ...oldVal,
                        formModal: {
                          mode: ZFormModeE.edit,
                          open: true,
                        },
                        selectedItem: _rowInfo?.original,
                      }));
                    }}
                  >
                    Edit
                  </ZButton>
                  <ZButton
                    color={ZRUColorE.tomato}
                    size="1"
                    onClick={() => {
                      setCompState((oldVal) => ({
                        ...oldVal,
                        deleteModal: {
                          open: true,
                        },
                        selectedItem: _rowInfo?.original,
                      }));
                    }}
                  >
                    Delete
                  </ZButton>
                </>
              );
            }}
          />

          <ZCard className="mt-3">
            <ZFlex>
              <ZPagination
                paginationItems={[1, 2, 3, "...", 8, 9, 10]}
                currentPage={2}
              />
            </ZFlex>
          </ZCard>
        </ZBox>
      </ZBox>

      {/* Form Modal */}
      <ZModal
        title={`${compState?.formModal?.mode === ZFormModeE.add ? "Add" : "Edit"} Game`}
        open={compState?.formModal?.open}
        crossOnClick={() => {
          if (!isCreateGamePending && !isUpdateGamePending) {
            setCompState((oldVal) => ({
              ...oldVal,
              selectedItem: {},
              formModal: {
                ...oldVal?.formModal,
                open: false,
                mode: ZFormModeE.add,
              },
            }));
          }
        }}
      >
        <ZBox className="mt-5">
          <Formik
            initialValues={formModalInitialValues}
            validate={formModalValidationHandler}
            enableReinitialize
            onSubmit={formModalSubmitHandler}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => {
              return (
                <Form className="space-y-4">
                  <ZInput
                    name="title"
                    required
                    label="Title"
                    value={values?.title}
                    isTouched={touched?.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors?.title}
                  />

                  <ZInput
                    name="personsAllowed"
                    required
                    label="Persons allowed"
                    value={values?.personsAllowed}
                    isTouched={touched?.personsAllowed}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type={ZRUInputTypeE.number}
                    errorMessage={errors?.personsAllowed}
                  />

                  <ZInput
                    name="feePerPerson"
                    required
                    label="Fee per person"
                    value={values?.feePerPerson}
                    isTouched={touched?.feePerPerson}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type={ZRUInputTypeE.number}
                    errorMessage={errors?.feePerPerson}
                  />

                  <ZInput
                    name="serviceCharges"
                    required
                    label="Service charges"
                    value={values?.serviceCharges}
                    isTouched={touched?.serviceCharges}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type={ZRUInputTypeE.number}
                    errorMessage={errors?.serviceCharges}
                  />

                  <ZInput
                    name="image"
                    required
                    label="Image url"
                    value={values?.image}
                    isTouched={touched?.image}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors?.image}
                  />

                  <ZTextArea
                    name="description"
                    required
                    label="Description"
                    value={values?.description}
                    isTouched={touched?.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors?.description}
                  />

                  <FormActionButtons
                    mode={compState?.formModal?.mode}
                    processing={isCreateGamePending || isUpdateGamePending}
                  />
                </Form>
              );
            }}
          </Formik>
        </ZBox>
      </ZModal>

      {/* Delete Modal */}
      <ZModal
        open={compState?.deleteModal?.open}
        title="Delete User"
        crossOnClick={() => {
          if (!isDeleteGamePending) {
            setCompState((oldVal) => ({
              ...oldVal,
              deleteModal: {
                ...oldVal?.deleteModal,
                open: false,
              },
            }));
          }
        }}
      >
        <ZBox className="mt-5">
          <ZFlex className="gap-3">
            <ZWarningOutlineIcon className="w-12 h-12" />
            <ZText>
              Are you sure you went to
              <ZText color={ZRUColorE.tomato} className="px-1 font-medium">
                delete
              </ZText>
              this game{" "}
              <ZText color={ZRUColorE.indigo}>
                {compState?.selectedItem?.title}
              </ZText>
            </ZText>
          </ZFlex>

          <ZFlex
            align={ZRUAlignE.center}
            justify={ZRUJustifyE.end}
            className="gap-3 mt-7"
          >
            <ZButton
              onClick={() => {
                setCompState((oldVal) => ({
                  ...oldVal,
                  deleteModal: {
                    ...oldVal?.deleteModal,
                    open: false,
                  },
                }));
              }}
              disabled={isDeleteGamePending}
            >
              Cancel
            </ZButton>
            <ZButton
              color={ZRUColorE.tomato}
              onClick={handleDeleteConfirm}
              loading={isDeleteGamePending}
            >
              Confirm
            </ZButton>
          </ZFlex>
        </ZBox>
      </ZModal>

      {/* View */}
      <ZModal
        open={compState?.viewModal?.open}
        title=""
        crossOnClick={() => {
          setCompState((oldVal) => ({
            ...oldVal,
            viewModal: {
              ...oldVal?.viewModal,
              open: false,
            },
          }));
        }}
      >
        <ZFlex
          align={ZRUAlignE.center}
          className="gap-2"
          direction={ZRUDirectionE.column}
        >
          <ZAvatar
            size="7"
            variant={ZRUAvatarVariantE.soft}
            color={ZRUColorE.violet}
            fallback={compState?.selectedItem?.title?.slice(0, 1) ?? ""}
          />
          <ZText
            className="block mt-2 text-lg font-medium"
            color={ZRUColorE.bronze}
          >
            {compState?.selectedItem?.title}
          </ZText>
        </ZFlex>

        <ZDataList
          className="mt-7"
          dataList={[
            {
              label: "Persons allowed",
              className: "text-base",
              valueProps: {
                className: "flex items-center justify-end",
              },
              value:
                compState?.selectedItem?.personsAllowed ??
                constants?.defaultValue?.fallbackValue,
            },
            {
              label: "Fee per person",
              className: "text-base",
              valueProps: {
                className: "flex items-center justify-end",
              },
              value:
                compState?.selectedItem?.feePerPerson ??
                constants?.defaultValue?.fallbackValue,
            },
            {
              label: "Service charges",
              className: "text-base",
              valueProps: {
                className: "flex items-center justify-end",
              },
              value:
                compState?.selectedItem?.serviceCharges ??
                constants?.defaultValue?.fallbackValue,
            },
          ]}
        />

        <ZText className="block mt-6 text-sm">
          {compState?.selectedItem?.description}
        </ZText>

        <ZFlex className="mt-6" align={ZRUAlignE.center}>
          <ZButton
            onClick={() => {
              setCompState((oldVal) => ({
                ...oldVal,
                viewModal: {
                  ...oldVal?.viewModal,
                  open: false,
                },
              }));
            }}
          >
            Close
          </ZButton>
        </ZFlex>
      </ZModal>
    </>
  );
};

export default Game;
